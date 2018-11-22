/**
   * @author : David
   * @date : 22/11/2018
   * @description :Test Class for Attachment
   */
public with sharing class OrmAttachmentFactory {
    
    public static void generateAttachments(String  idAssessment ){
        
        for(Integer i=0;i<20; i++){
            ContentVersion testContentInsert = new ContentVersion(); 
		    testContentInsert.Title = 'File'+ i; 
		    testContentInsert.VersionData=EncodingUtil.base64Decode('fileContent'+i);
		    testContentInsert.PathOnClient='/' + 'File'+ i ;
		    testContentInsert.orm_title_document__c= 'Title'+ i;
		    testContentInsert.orm_auteur__c= 'Author'+ i;
		    testContentInsert.orm_numeroDeReference__c= 'referenceNumber'+ i;
		    
		    insert testContentInsert; 
		
		    testContentInsert = [select id, ContentDocumentId from ContentVersion WHERE Id =: testContentInsert.Id];
		    ContentDocumentLink cl = new ContentDocumentLink();
		    cl.ContentDocumentId = testContentInsert.ContentDocumentId;
		    cl.LinkedEntityId = idAssessment; 
		    cl.ShareType = 'V';
		    cl.Visibility = 'AllUsers';
		    insert cl;
		    
        } 
        
    }
}