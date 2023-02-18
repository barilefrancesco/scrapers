# import necessari
import datetime  # gestione date e orari
import json  # gestione del formato JSON
import os  # interfaccia per le funzionalità del sistema operativo
import re  # espressioni regolari
import shutil  # operazioni di copia, spostamento e rimozione di file e directory
import sys  # funzioni e variabili di sistema
import traceback  # stampa delle tracce di chiamata
from time import sleep  # gestione delle attese

from bs4 import BeautifulSoup  # parsing di HTML e XML
from flask import Flask  # framework per applicazioni web
from flask_cors import CORS  # gestione delle richieste cross-origin
from flask_restful import Api, request  # API RESTful
from selenium import webdriver  # automazione del browser web
from selenium.webdriver.chrome.options import Options  # opzioni di configurazione del browser
from sortedcontainers import SortedSet  # insieme ordinato

# Per scaricare il driver di Google Chrome, vai su https://chromedriver.chromium.org/downloads
# Puoi impostare il percorso del driver di Chrome nella variabile di sistema PATH e rimuovere questa variabile
CHROMEDRIVER_PATH = 'utils/linux/chromedriver' if sys.platform.startswith('linux') else 'utils/windows/chromedriver.exe'

# Costanti utilizzate per l'identificazione dei componenti della pagina HTML di WhatsApp Web
CONTACT_NAME_DIV = 'k8VZe'
CONVERSATION_PANEL = '_2Ex_b'
CONTACT_NAME = '_21S-L'
USER_DATA_DIR = 'C:/user-data'

# Inizializzazione dell'app Flask e della API RESTful
app = Flask(__name__)
api = Api(app)
CORS(app)

# Definizione della classe per i messaggi quotati
class MessageQuoted:
    autore = ""
    messaggio = ""

    def __init__(self, quote, quoteAuthor):
        self.messaggio = quote
        self.autore = quoteAuthor

# Funzione di conversione di oggetti datetime in dizionari, per la serializzazione in JSON
def json_default(value):
    if isinstance(value, datetime.date):
        return dict(year=value.year, month=value.month, day=value.day, hour=value.hour, minutes=value.minute)
    if isinstance(value, Message):
        return dict(autore=value.person,
                    data=dict(year=value.date.year, month=value.date.month, day=value.date.day),
                    giorno=value.day,
                    ora=value.time,
                    messaggio=value.text,
                    messaggioCitato=dict(autore=value.quote.autore, messaggio=value.quote.messaggio))
    else:
        return value.__dict__

# Definizione della classe per i messaggi
class Message:
    text = ""
    day = ""
    time = ""
    person = ""
    quote = MessageQuoted
    date = datetime.datetime.now()

    # Metodo per la conversione di oggetti Message in dizionari, per la serializzazione in JSON
    def __dict__(self):
        return json.dumps(self, default=json_default,
                          sort_keys=True, indent=4)

    # Metodo per la visualizzazione del messaggio in console
    def display(self):
        if self.quote.autore != "":
            print("[%s, %s]  %s %s -'%s: %s' " % (
                self.day, self.time, self.person, self.text, self.quote.autore, self.quote.messaggio))
        if self.day == "":
            print("%s: %s " % (
                self.person, self.text))
        if self.quote.autore == "" and self.day != "":
            print("[%s, %s]  %s %s " % (
                self.day, self.time, self.person, self.text))
        return 0
    # Funzione per ottenere il messaggio come stringa

    def asString(self):
        if self.quote.autore != "":
            return "[%s, %s]  %s %s -'%s: %s' " % (
                self.day, self.time, self.person, self.text, self.quote.autore, self.quote.messaggio)
        if self.day == "":
            return "%s: %s " % (
                self.person, self.text)
        if self.quote.autore == "" and self.day != "":
            return "[%s, %s]  %s %s " % (
                self.day, self.time, self.person, self.text)

    def __init__(self, text, day, time, person, quote, quoteAuthor):
        self.text = text
        self.day = day
        self.time = time
        self.person = person
        self.quote = MessageQuoted(quote, quoteAuthor)

    def __eq__(self, other):
        return self.date == other.date

    def __lt__(self, other):
        return self.date < other.date

    def __hash__(self):
        return id(self)


def manageHtml(soup):
    """
    Extracts messages from a BeautifulSoup object and returns them as a SortedSet of Message objects.
    """
    messages = SortedSet()
    messagesInDiv = soup.findAll('div', attrs={'class': re.compile(r"message-*")})
    lastDay = ""
    lastTime = ""
    for message in messagesInDiv:
        # Find a div with a data-testid attribute of 'quoted-message' that contains a span with a class of 'quoted-mention'
        quotedDiv = message.find('div', attrs={'data-testid': 'quoted-message'})
        messaggioQuotato = ""
        autoreQuote = ""
        # If there is a quoted message, extract its text and author
        if (quotedDiv):
            quotedElem = quotedDiv.find('span', attrs={'class': 'quoted-mention'})
            if (quotedElem):
                messaggioQuotato = quotedElem.text
            autoreQuote = quotedDiv.text.replace(messaggioQuotato, '')
        # Find the message element with a data-pre-plain-text attribute
        elemento = message.find('div', attrs={'data-pre-plain-text': True})

        if (elemento):
            elem = elemento.attrs['data-pre-plain-text']
            # Find the span element with class 'selectable-text' or 'copyable-text' that contains the message text
            e = message.find('span', attrs={'class': ['selectable-text', 'copyable-text']})
            if e:
                # Extract the message text, day, time, author, quoted message and quoted author
                m = Message(e.text, elem.split(", ")[1].split("]")[0],
                            elem.split(", ")[0].split("[")[1],
                            elem.split(", ")[1].split("]")[1], messaggioQuotato, autoreQuote)
                # Convert the day and time to a datetime object and set it as the message date
                lastDay = m.day
                lastTime = m.time
                m.date = datetime.datetime(int(m.day.split("/")[2]), int(m.day.split("/")[1]),
                                           int(m.day.split("/")[0]),
                                           int(m.time.split(":")[0]), int(m.time.split(":")[1]))
                messages.add(m)
            else:
                # If the message is an image or other media, set the message
                m = Message("", elem.split(", ")[1].split("]")[0],
                            elem.split(", ")[0].split("[")[1],
                            elem.split(", ")[1].split("]")[1], messaggioQuotato, autoreQuote)
                lastDay = m.day
                lastTime = m.time
                m.date = datetime.datetime(int(m.day.split("/")[2]), int(m.day.split("/")[1]),
                                           int(m.day.split("/")[0]),
                                           int(m.time.split(":")[0]), int(m.time.split(":")[1]))
                messages.add(m)
        else:
            tuo = message.find('span', attrs={'aria-label': 'Tu:'})
            if tuo:
                m = Message("<audio>", lastDay, lastTime, "Tu:", "", "")
                try:
                    if (m.day):
                        m.date = datetime.datetime \
                            (int(m.day.split("/")[2]), int(m.day.split("/")[1]),
                             int(m.day.split("/")[0]),
                             int(m.time.split(":")[0]),
                             int(m.time.split(":")[1]))
                except Exception as e:
                    print(e)
                    traceback.print_exc()
                messages.add(m)
            else:
                m = Message("<audio>", lastDay, lastTime, message.find('span', attrs={'dir': 'auto'}).text, "", "")
                try:
                    if (m.day):
                        m.date = datetime.datetime \
                            (int(m.day.split("/")[2]), int(m.day.split("/")[1]),
                             int(m.day.split("/")[0]),
                             int(m.time.split(":")[0]),
                             int(m.time.split(":")[1]))
                except Exception as e:
                    print(e)
                    traceback.print_exc()
                messages.add(m)
    return messages


def get_messages(driver, contact, contatti):
    SCROLL_SIZE = 600
    conversations = []
    if (contact != "Archiviate") and (
            len(contatti) == 0 or contact.lower() in map(str.lower, contatti)):  # ignore archive container
        # if (contact == "Triage forense"):  # to remove this, just for test
        sleep(2)
        try:
            user = driver.find_element_by_xpath('//span[contains(@title, "{}")]'.format(contact))
            driver.find_element_by_tag_name("body")
        except Exception as e:
            print(e)
            user = ""
            traceback.print_exc()
        if user != "":
            user.click()
            sleep(3)

            messages = SortedSet()
            scroll = SCROLL_SIZE
            lengthActual = 0
            finished = True
            while finished:  # before I discover all messages and then I wrote them to the list
                try:
                    conversation_pane = driver.find_element_by_xpath("//div[@class='" + CONVERSATION_PANEL + "']")
                    elements = driver.find_elements_by_xpath("//div[@class='copyable-text']")
                    # print(contact + '  :' + str(scroll))
                    if lengthActual == len(elements) or scroll > 15000:
                        # Find data-testid="conversation-panel-messages" in the DOM to get class name
                        stri = conversation_pane.get_attribute('innerHTML')
                        soup = BeautifulSoup(stri, 'html5lib')
                        messages = manageHtml(soup)
                        finished = False
                    else:
                        lengthActual = len(elements)
                        driver.execute_script('arguments[0].scrollTop = -' + str(scroll), conversation_pane)
                        sleep(2)
                        scroll += SCROLL_SIZE
                except Exception as e:
                    print(e)
                    traceback.print_exc()
                    break
            conversations.append({"contatto": contact, "messaggi": list(messages)})
            print(conversations)
    return conversations


def mainCall(contatti):
    conversations = []

    options = Options()
    options.add_argument(
        'user-data-dir=' + USER_DATA_DIR)  # saving user data so you don't have to scan the QR Code again
    driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, options=options)
    driver.get('https://web.whatsapp.com/')
    continued = True
    while continued:
        continued = continued != (len(driver.find_elements_by_class_name(CONTACT_NAME_DIV)) > 0)
        sleep(1)

    try:
        # retrieving the contacts
        print('>>> getting contact list')
        scroll = 100
        last = -50
        paneSide = driver.find_element_by_id("pane-side")
        listaContatti = set()
        while (paneSide.get_attribute("scrollTop") != scroll):
            scroll = scroll + 100
            if last == paneSide.get_attribute("scrollTop"):
                break
            last = paneSide.get_attribute("scrollTop")
            html = paneSide.get_attribute("innerHTML")
            soup = BeautifulSoup(html, 'html5lib')
            contacts_sel = soup.findAll('div', attrs={'class': CONTACT_NAME})
            for j in contacts_sel:
                if hasattr(j, "text") and len(j.text) > 0:
                    if list(listaContatti).count(j.text) == 0:
                        listaContatti.add(j.text)
                        conversations.extend(get_messages(driver, j.text, contatti))
            driver.execute_script('arguments[0].scrollTop = ' + str(scroll), paneSide)
        print(len(conversations), "conversations retrieved")
    except Exception as e:
        print(e)
        traceback.print_exc()
    finally:
        driver.close()
        return conversations


@app.get('/')
def getHello():
    return "hello a sort"


@app.get('/forget')
def forgetUser():
    folder = USER_DATA_DIR
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))
    return "true"


@app.get('/messages')
def getMessages():
    args = request.args

    contatti = args.get("contacts")
    if contatti:
        contatti = contatti.split(",")
    else:
        contatti = []
    return {"messages": json.dumps(mainCall(contatti), default=json_default,
                                   sort_keys=True), "status_code": 200}


def main():
    mainCall([])


if __name__ == "__main__":
    app.run(port=5002)
