public with sharing class OrmEmailTemplateController {
    /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get Email template
 * @history 
 * 2018-09-10: Salimata NGOM - Implementation
 */
    @AuraEnabled
    public static list<EmailTemplate> getTemplates(){
    
        list<EmailTemplate> emailTemp = new list<EmailTemplate>();
        emailTemp = [SELECT Id,Name,Subject,TemplateType FROM EmailTemplate WHERE TemplateType IN ('custom','text')];
        return emailTemp;
    }
 /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get Email Template Details
 * @history 
 * 2018-09-10: Salimata NGOM - Implementation
 */
        @AuraEnabled 
    public static EmailTemplate getTemplateDetails(string templteId){
        
        EmailTemplate emailTemp = new EmailTemplate();
        list<EmailTemplate> emailTempLst = new list<EmailTemplate>();
        emailTempLst = [SELECT Id,Name,Subject,TemplateType,body FROM EmailTemplate WHERE ID=: templteId];
        
        emailTemp = emailTempLst.size()>0 ? emailTempLst[0] : emailTemp;
        return emailTemp;
        
    }
     /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to send Email Template 
 * @history 
 * 2018-09-11: Salimata NGOM - Implementation
 */
     @AuraEnabled 
    public static void sendMailMethod(List<Contact> mailcontacts ,String mSubject ,String templateId){
    
     List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
  
     //  Create a new Email
       Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
          //  Set email contents - you can use variables and Id template
      mail.setSubject(mSubject);
    mail.setTemplateID(templateId); 
     mail.setSaveAsActivity(false);
     

    // Set list of people who should get the email
       List<String> sendTo = new List<String>();
       for(Contact contactId:mailcontacts){
       sendTo.add(contactId.Email);
       }
       mail.setToAddresses(sendTo);
    
    // Set who the email is sent from
       mail.setReplyTo('noreply@gmail.com'); // change it with your mail address.
       mail.setSenderDisplayName('salesforce User'); 
    
 
    
    //  Add your email to the master list
      mails.add(mail);
    
  // Send all emails in the master list
     Messaging.sendEmail(mails);
   }

}