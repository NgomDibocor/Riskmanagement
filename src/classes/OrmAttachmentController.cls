/**
 * @author: Salimata NGOM
 * @date: Creation: 31/08/2018
 * @description: Controller for managing Attachment
*/

public with sharing class OrmAttachmentController {
	public static Map<String, Object> error;
	
/**
 * @author: Salimata NGOM
 * @date: Creation: 31/08/2018
 * @description:  method for save file uploaded
*/
	
	@AuraEnabled
    public static Id saveTheFiles(Id parentId, String fileName,String titleFile,String authorFile,String referenceNumber, String base64Data, String contentType)  
    { 
	    system.debug('Saving chatter files '+fileName + ' '+ contentType);
	    system.debug('Saving chatter files '+base64Data + ' '+ base64Data);
	    ContentVersion testContentInsert =new ContentVersion(); 
	    testContentInsert.Title =fileName; 
	    testContentInsert.VersionData=EncodingUtil.base64Decode(base64Data);
	    testContentInsert.PathOnClient='/' + fileName ;
	    testContentInsert.orm_title_document__c=titleFile;
	    testContentInsert.orm_auteur__c=authorFile;
	    testContentInsert.orm_numeroDeReference__c=referenceNumber;
	    
	    insert testContentInsert; 
	
	    system.debug('testContentInsert.id '+ testContentInsert.id);
	    testContentInsert = [select id, ContentDocumentId from ContentVersion WHERE Id =: testContentInsert.Id];
	    ContentDocumentLink cl = new ContentDocumentLink();
	    cl.ContentDocumentId = testContentInsert.ContentDocumentId;
	    cl.LinkedEntityId = parentId; 
	    cl.ShareType = 'V';
	    cl.Visibility = 'AllUsers';
	    insert cl;
	
	    System.debug('testContentInsert.id');
	    return testContentInsert.id;

    } 
/**
 * @author: Salimata NGOM
 * @date: Creation: 31/08/2018
 * @description:  method for get attachment  uploaded
*/
    
     @AuraEnabled
     public static List<ContentDocument> findAllContentDocumentByParentId(String parentId){
        List<ContentDocumentLink> cdls= new List<ContentDocumentLink>();

        cdls.addAll([select ContentDocumentId from ContentDocumentLink where LinkedEntityId =:parentId]); 
        set <Id> idcds = new set <Id> ();
        for(ContentDocumentLink cdl:cdls ){
            idcds.add(cdl.ContentDocumentId);
        }
        
        return [SELECT Id,Title,ParentId, (SELECT orm_title_document__c, orm_auteur__c, orm_numeroDeReference__c FROM ContentVersions) from ContentDocument where Id IN :idcds ];
}
    
/**
 * @author: Salimata NGOM
 * @date: Creation: 24/09/2018
 * @description:  method for delete attachment  
*/
     @AuraEnabled
      public static void DeleteAttachment(List<Id> att) {

		system.debug('ORM_Attachment --> DeleteAttachment');
		try{
	  List <ContentDocument> lstDeleteRec = [select Id from ContentDocument where id IN: att];
	delete(lstDeleteRec );
  
		} catch (Exception ex) {

			String message = 'EXCEPTION - Message: ' + ex.getMessage() + 'Cause: ' + ex.getCause();
			system.debug('message error'+message);
		
  }
      }  
	
}