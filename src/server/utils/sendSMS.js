
import googl from 'goo.gl'
import sdk from 'messagemedia-messages-sdk'

const controller = sdk.MessagesController

const { SMS_KEY, SMS_USER, GOOGLE_API_KEY } = process.env

sdk.Configuration.basicAuthUserName = SMS_USER; // Your API Key
sdk.Configuration.basicAuthPassword = SMS_KEY; // Your Secret Key

// Setup for Google URL Shortner
googl.setKey(GOOGLE_API_KEY);
googl.getKey();

// SMS service
export const sendSMS = async (mobile, linkUrl, companyName, firstTime) => {
  const shortUrl = await googl.shorten(linkUrl)
  // const firstBody = `${companyName} has engaged the use of Ripple to be implemented as an easy and efficient device that promotes positive behaviour in your organisation and has been customised specifically to suit the needs of your professional environment. Please click ${shortUrl} and commence completion of this survey`
  // const secondBody = `Ripple – Contagious Attitude notification – Survey required! Please click ${shortUrl} to commence completion`
  const body = `Welcome to Ripple. This is your periodic link to complete the survey approved by ${companyName}. Please click ${shortUrl} to complete Ripple.`

  const messageBody = new sdk.SendMessagesRequest({
    "messages": [
      {
        "content": body,
        "destination_number": mobile,
        "format": "SMS"
      }
    ]
  })

  const sms = await controller.createSendMessages(messageBody, (err, res) => res ? res : err)
  return sms
}



