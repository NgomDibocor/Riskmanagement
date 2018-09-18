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
        emailTempLst = [SELECT Id,Name,Subject,TemplateType,Body,HtmlValue FROM EmailTemplate WHERE ID=: templteId];
        
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
    	//get template details
     List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
     //  Create a new Email
       Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
          //  Set email contents - you can use variables and Id template
      mail.setSubject(mSubject);
    mail.setTemplateID(templateId); 
     mail.setSaveAsActivity(true);
  	system.debug('templateid'+templateId);
 // Set who the email is sent from
       mail.setReplyTo('noreply@gmail.com'); // change it with your mail address.
       mail.setSenderDisplayName('salesforce User'); 
    // Set list of contact who should get the email
       for(Contact contactId:mailcontacts){
       	   mail.setTargetObjectId(contactId.Id);
       	   system.debug('setTargetObjectId'+contactId.Id);
       	   mail.setWhatId(contactId.orm_organisation__c);
       	   system.debug('setWhatId'+contactId.orm_organisation__c);
       	  String htmlbody=getTemplateDetails(templateId).htmlvalue;
       	  if(htmlbody!=null){
       	 htmlbody=htmlbody.replace('{!Contact.Name}',contactId.Name);
       	   mail.setHTMLBody(htmlbody);
       	   system.debug('getHtmlbody'+mail.getHTMLBody());
       	  }
       	  String textbody=getTemplateDetails(templateId).body;
       	  if(textbody!=null){
       	  textbody=textbody.replace('{!Contact.Name}',contactId.Name);
       	  mail.setPlainTextBody(textbody);
       	  system.debug('getPlainTextBody'+mail.getPlainTextBody());
       	  }
        //  Add  email to the master list
          mails.add(mail);
       }
    
  // Send all emails in the master list
     List<Messaging.SendEmailResult> sendEmailResults = Messaging.sendEmail(mails);
     //get 
     
   }
  /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to update orm_ContactWorkshop__c item
 * @history 
 * 2018-09-18: Salimata NGOM - Implementation
 */
    @AuraEnabled
	public static orm_ContactWorkshop__c updateContactWorkshop(orm_ContactWorkshop__c item){        
        return OrmContactController.updateContactWorkshop(item);
	}
}