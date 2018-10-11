trigger ormContactTrigger on Contact (before insert) {
      set<string> newEmailSet = new set<string>();
       set<string> dbEmailSet = new set<string>();
       for(Contact newContact : trigger.new){
        newEmailSet.add(newContact.Email);
    }
     for(Contact dbContact : [select id, Email from Contact where Email IN: newEmailSet and RecordTypeId=:OrmContactController.getContactRecordTypeId()]){
        dbEmailSet.add(dbContact.Email);

    }
     for(Contact newContact : trigger.new){

        if(dbEmailSet.Contains(newContact.Email))

            newContact.addError('You are inserting Duplicate Contact');

    }
    
}