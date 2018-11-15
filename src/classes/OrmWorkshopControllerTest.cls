/**
 * @author Salimata NGOM
 * @date Creation 30/10/2018
 * @description Test class for OrmWorkshopController.
 */
@isTest
private class OrmWorkshopControllerTest {

	  @testSetup
    static void setUp(){
	 Orm_TestFactory.generateWorkshop();      
    }
@isTest
	static void addWorkShop_TEST() {
	List<Contract>	listworkshop=[select Id, Name,RecordTypeId from Contract];
		String thisMethod = '##### addWorkShop_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        //get list workshop from TestFactory
        for( Contract singleWorkshop: listWorkshop){
        	OrmWorkshopController.addWorkShop(singleWorkshop);
        }
        System.debug(thisMethod + ' - STOP');
		
	}
    
}