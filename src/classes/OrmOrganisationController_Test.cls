/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmOrganisationController
 */
@isTest
public with sharing class OrmOrganisationController_Test {
                 @testSetup
    static void setUp(){	 
    	List<Account> organisations = OrmAssessmentFactory.generateOrganisation(); 
    }
     /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getOrganisations
     */
    @isTest
    static void getOrganisations_test(){
        String methodName='getOrganisations';
        System.debug('### start- '+methodName);
        System.assertEquals(OrmOrganisationController.getOrganisations().size(), 20);
        System.debug('### end- '+methodName);
    }
         /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getOrganisation
     */
    @isTest
    static void getOrganisation_test(){
        String methodName='getOrganisation';
        System.debug('### start- '+methodName);
        Id accountId = [SELECT Id FROM Account limit 1].Id;
        System.assertNotEquals(OrmOrganisationController.getOrganisation(accountId) , Null);
        System.debug('### end- '+methodName);
    }
        /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getSelectOptions
     */
    @isTest
    static void getSelectOptions_Test(){
        String methodName='getSelectOptions';
        System.debug('### start- '+methodName);
        Account organisation = new Account();
        List<String> lstPick = OrmOrganisationController.getSelectOptions(organisation,'orm_currency__c');
        System.assertNotEquals(lstPick.size(), 0);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test add
     */
    @isTest
    static void add_Test(){
        String methodName='add';
        System.debug('### start- '+methodName);
        Account organisation = new Account( Name= 'organisation',RecordTypeId = OrmOrganisationController.getOrganisationRecordTypeId());
        organisation= OrmOrganisationController.add(organisation);
        System.assertNotEquals(organisation.Id, null);
        System.debug('### end- '+methodName);
    }
}