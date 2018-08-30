/**
 * @author: Salimata
 * @date: Creation: 30/08/2018
 * @description: Controller for managing Assumption
*/
public with sharing class OrmAssumptionController {
/**
* @author: Laye
* @date: Creation: 27/07/2018
 * @description: get recordType Cause
*/
    public static Id getAssumptionRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Assumption').getRecordTypeId();
        return RecordTypeId;
    }
    
}