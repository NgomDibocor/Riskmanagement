<aura:application extends='force:slds'>
    <aura:handler action="{!c.doInit}" name="init" value="{!this}" />
    <aura:handler action="{!c.createOrganisationShow}" event="c:navigateToOrganisationShow" />
    <aura:handler action="{!c.createOrganisationEdit}" event="c:navigateToOrganisationEdit" />
    <div class="slds-grid  slds-wrap ">
        <div class=" slds-size--1-of-2   slds-p-horizontal--small right-header ">
            {!v.body}
        </div>
       <!-- <c:OrmRiskManagementCmp />-->
        <!-- <c:ormRiskOrganisationNew/>-->
              <c:OrmWorkShopNewCmp /> 
              <c:OrmWorkShopListCmp/>

    </div>
</aura:application>