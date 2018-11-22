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
    public static  Map<String, Object> sendMailMethod(List<Contact> mailcontacts ,String mSubject ,String templateId,String workshop){
    	//get template details
     List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
     List<orm_ContactWorkshop__c> listcontact=new List<orm_ContactWorkshop__c>();
      List<Contact> listcontactfail=new List<Contact>();
   //   List<List<Object>> resultList=new list<List<Object>>();
       for(Contact contactId : mailcontacts){
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
       	   mail.setTargetObjectId(contactId.Id);
       	   system.debug('setTargetObjectId'+mail.getTargetObjectId());
       	   mail.setWhatId(contactId.orm_organisation__c);
       	   system.debug('setWhatId'+contactId.orm_organisation__c);
       	  String htmlbody=getTemplateDetails(templateId).htmlValue;
       	  String textbody=getTemplateDetails(templateId).body;
       	  if(htmlbody!=null){
       	 htmlbody=htmlbody.replace('{Contact.Name}',contactId.Name);
       	   mail.setHTMLBody(htmlbody);
       	   system.debug('getHtmlbody'+mail.getHTMLBody());
       	  }
       	  if(textbody!=null){
       	  textbody=textbody.replace('{!Contact.Name}',contactId.Name);
       	  mail.setPlainTextBody(textbody);
       	  system.debug('getPlainTextBody'+mail.getPlainTextBody());
       	  }
        //  Add  email to the master list
          mails.add(mail);
       }
    
  // Send all emails in the master list
   
      Messaging.SendEmailResult [] sendEmailResults =   Messaging.sendEmail(mails,false);
      System.debug('workshop'+workshop);
      Integer i=0;
    for(Messaging.SendEmailResult result:sendEmailResults){
        
        //create  contact workshop if result issuccess
        if(result.isSuccess() == true){
        	
        orm_ContactWorkshop__c contactworkshop =new orm_ContactWorkshop__c();
        	contactworkshop.orm_contact__c=mails.get(i).getTargetObjectId();
        	contactworkshop.orm_Workshop__c=workshop;
        	contactworkshop.orm_notification__c=true;
			orm_ContactWorkshop__c contactwshop = OrmContactController.addOneContactWorkShop(contactworkshop);
        	System.debug('Email result ' +mails.get(i).getTargetObjectId());
        	listcontact.add(contactwshop);
        }else if(result.isSuccess() == false)
        {
        	//find contact 
        	Contact onecontact=OrmContactController.findOneContact(mails.get(i).getTargetObjectId());
        		listcontactfail.add(onecontact);
        	 	System.debug('email incorrect');
        	System.debug('Email not success  ' +result.isSuccess());
        	
        }
	i=i+1;
   }
  // resultList.add(listcontact);
   //resultList.add(listcontactfail);
  // return resultList;
  return new Map<String, Object>{'listcontactworkshop' => listcontact, 'contactfailed' => listcontactfail};
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