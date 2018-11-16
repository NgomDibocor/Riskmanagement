public with sharing class OrmRiskFactory {
   /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of riques
   */
    public static List<Macro> generateRisques()
    {
        List<Macro> risques = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            risques.add(new Macro( Name= 'risque'+i));
       } 
        insert risques;
        return risques;
    }  
    
}