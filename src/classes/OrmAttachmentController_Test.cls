/**
 * @author Salimata NGOM
 * @date Creation 16/11/2018
 * @description Test class for  OrmAttachmentController.
 */
@isTest
private class OrmAttachmentController_Test {
    @testSetup
    static void setup(){
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		OrmAttachmentFactory.generateAttachments(assessments[0].Id);
    }
   
    /**
     * @author: Dibocor NGOM
     * @date: Creation 22/11/2018
     * @description: test method for DeleteAttachment
     */
	 static testmethod void saveTheFiles_Test() {
		String methodName = '##### saveTheFiles_Test';
        System.debug('### start- '+methodName);
        Id idAssessment = [SELECT Id FROM Assessment__c limit 1].Id;
	    Id idDoc= OrmAttachmentController.saveTheFiles(idAssessment,'fileName', 'titleFile', 'authorFile', 'referenceNumber', 'base64Data', 'contentType');
        Test.startTest();
        System.assertNotEquals(idDoc, null);
        Test.stopTest();
        System.debug('### end- '+methodName);
	 }
	 
	 /**
     * @author: Dibocor NGOM
     * @date: Creation 22/11/2018
     * @description: test method for DeleteAttachment
     */
	 static testmethod void DeleteAttachment_Test() {
		String methodName = '##### DeleteAttachment_Test';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        //get the first attachment
        List<ContentDocumentLink> cdls= new List<ContentDocumentLink>();
        cdls.addAll([select ContentDocumentId from ContentDocumentLink where LinkedEntityId =:assessmentId]); 
        set <Id> idcds = new set <Id> ();
        for(ContentDocumentLink cdl:cdls ){
            idcds.add(cdl.ContentDocumentId);
        }
        ContentDocument attachment = [SELECT Id From ContentDocument where Id IN :idcds limit 1];
        //build a list of Attachment's Id
        List<Id> attachmentIds = new List<Id>();
        attachmentIds.add(attachment.Id);
        //get size before the deletion
        integer size = OrmAttachmentController.findAllContentDocumentByParentId(assessmentId).size();
        OrmAttachmentController.DeleteAttachment(attachmentIds);
        Test.startTest();
        System.assertEquals( OrmAttachmentController.findAllContentDocumentByParentId(assessmentId).size(), size-1);
        Test.stopTest();
        System.debug('### end- '+methodName);
	 }
	 
	 /**
     * @author: Dibocor NGOM
     * @date: Creation 22/11/2018
     * @description: test method for findAllContentDocumentByParentId
     */
	 static testmethod void findAllContentDocumentByParentId_Test() {
		String methodName = '##### findAllContentDocumentByParentId_Test';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Test.startTest();
        System.assertEquals(OrmAttachmentController.findAllContentDocumentByParentId(assessmentId).size(), 20);
        Test.stopTest();
        System.debug('### end- '+methodName);
	 }
}