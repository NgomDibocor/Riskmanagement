/**
 * @author: Salimata NGOM
 * @date: Creation: 31/08/2018
 * @description: Controller for managing Attachment
*/

public with sharing class OrmAttachmentController {
/**
 * @author: Salimata NGOM
 * @date: Creation: 31/08/2018
 * @description:  method for save file uploaded
*/
	
	@AuraEnabled
    public static Id saveTheFiles(Id parentId, String fileName, String base64Data, String contentType)  
    { 
	    system.debug('Saving chatter files '+fileName + ' '+ contentType);
	    ContentVersion testContentInsert =new ContentVersion(); 
	    testContentInsert.Title =fileName; 
	    testContentInsert.VersionData=EncodingUtil.base64Decode(base64Data);
	    testContentInsert.PathOnClient='/' + fileName ;
	    testContentInsert.orm_title_document__c='titre du document';
	    testContentInsert.orm_auteur__c='auteur';
	    testContentInsert.orm_numeroDeReference__c='numero de reference';
	    
	    insert testContentInsert; 
	
	    system.debug('testContentInsert.id '+ testContentInsert.id);
	    testContentInsert = [select id, ContentDocumentId from ContentVersion WHERE Id =: testContentInsert.Id];
	    ContentDocumentLink cl = new ContentDocumentLink();
	    cl.ContentDocumentId = testContentInsert.ContentDocumentId;
	    cl.LinkedEntityId = parentId; 
	    cl.ShareType = 'V';
	    cl.Visibility = 'AllUsers';
	    insert cl;
	
	    system.debug('testContentInsert.id');
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
    
    
}