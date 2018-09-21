<aura:application extends='force:slds'>
	
<table  class="slds-table slds-table_bordered slds-table_edit slds-table_fixed-layout slds-table_resizable-cols" role="grid" style="width: 66.75rem;">
<thead>
<tr class="slds-line-height_reset">

<th class="slds-text-title_caps" scope="col" style="width: 2rem;">
<span id="column-group-header" class="slds-assistive-text">Choose a row</span>
<div class="slds-th__action slds-th__action_form">
<div class="slds-checkbox">
<input type="checkbox" name="options" id="checkbox-13" tabindex="-1" aria-labelledby="check-select-all-label column-group-header" value="checkbox-13" />
<label class="slds-checkbox__label" for="checkbox-13" id="check-select-all-label">
<span class="slds-checkbox_faux"></span>
<span class="slds-form-element__label slds-assistive-text">Select All</span>
</label>
</div>
</div>
</th>
<th aria-label="Name" aria-sort="none" class="slds-text-title_caps slds-is-resizable slds-is-sortable" scope="col" style="width: 8.75rem;">
<a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
<span class="slds-assistive-text">Sort by: </span>
<div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
<span class="slds-truncate" title="Name">Name</span>
<span class="slds-icon_container slds-icon-utility-arrowdown">

</span>
</div>
</a>
<div class="slds-resizable">
<input aria-label="Name column width" class="slds-resizable__input slds-assistive-text" id="cell-resize-handle-22" max="1000" min="20" tabindex="-1" type="range" />
<span class="slds-resizable__handle">
<span class="slds-resizable__divider"></span>
</span>
</div>
</th>
<th aria-label="Account Name" aria-sort="none" class="slds-text-title_caps slds-is-resizable slds-is-sortable" scope="col" style="width: 8.75rem;">
<a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
<span class="slds-assistive-text">Sort by: </span>
<div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
<span class="slds-truncate" title="Account Name">Account Name</span>
<span class="slds-icon_container slds-icon-utility-arrowdown">

</span>
</div>
</a>
<div class="slds-resizable">
<input aria-label="Account Name column width" class="slds-resizable__input slds-assistive-text" id="cell-resize-handle-23" max="1000" min="20" tabindex="-1" type="range" />
<span class="slds-resizable__handle">
<span class="slds-resizable__divider"></span>
</span>
</div>
</th>
<th aria-label="Close Date" aria-sort="none" class="slds-text-title_caps slds-is-resizable slds-is-sortable" scope="col" style="width: 8.75rem;">
<a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
<span class="slds-assistive-text">Sort by: </span>
<div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
<span class="slds-truncate" title="Close Date">Close Date</span>
<span class="slds-icon_container slds-icon-utility-arrowdown">

</span>
</div>
</a>
<div class="slds-resizable">
<input aria-label="Close Date column width" class="slds-resizable__input slds-assistive-text" id="cell-resize-handle-24" max="1000" min="20" tabindex="-1" type="range" />
<span class="slds-resizable__handle">
<span class="slds-resizable__divider"></span>
</span>
</div>
</th>
<th aria-label="Stage" aria-sort="none" class="slds-text-title_caps slds-is-resizable slds-is-sortable" scope="col" style="width: 8.75rem;">
<a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
<span class="slds-assistive-text">Sort by: </span>
<div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
<span class="slds-truncate" title="Stage">Stage</span>
<span class="slds-icon_container slds-icon-utility-arrowdown">

</span>
</div>
</a>
<div class="slds-resizable">
<input aria-label="Stage column width" class="slds-resizable__input slds-assistive-text" id="cell-resize-handle-25" max="1000" min="20" tabindex="-1" type="range" />
<span class="slds-resizable__handle">
<span class="slds-resizable__divider"></span>
</span>
</div>
</th>




</tr>
</thead>
<tbody>
<tr aria-selected="false" class="slds-hint-parent">

<td class="slds-cell-edit" role="gridcell">
<div class="slds-checkbox">
<input type="checkbox" name="options" id="checkbox-01" tabindex="-1" aria-labelledby="check-button-label-01 column-group-header" value="checkbox-01" />
<label class="slds-checkbox__label" for="checkbox-01" id="check-button-label-01">
<span class="slds-checkbox_faux"></span>
<span class="slds-form-element__label slds-assistive-text">Select item 1</span>
</label>
</div>
</td>
<th class="slds-cell-edit" scope="row" tabindex="0">
<span class="slds-grid slds-grid_align-spread"><a class="slds-truncate" href="javascript:void(0);" id="link-01" tabindex="-1" title="Acme - 1,200 Widgets">Acme - 1,200 Widgets</a>
<button class="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small" tabindex="-1" title="Edit Name of Acme - 1,200 Widgets">

<span class="slds-assistive-text">Edit Name of Acme - 1,200 Widgets</span>
</button>
</span>
</th>
<td class="slds-cell-edit" role="gridcell">
<span class="slds-grid slds-grid_align-spread">
<span class="slds-truncate" title="Acme">Acme</span>
<button class="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small" tabindex="-1" title="Edit Account Name of Acme - 1,200 Widgets">

<span class="slds-assistive-text">Edit Account Name of Acme - 1,200 Widgets</span>
</button>
</span>
</td>
<td class="slds-cell-edit" role="gridcell">
<span class="slds-grid slds-grid_align-spread">
<span class="slds-truncate" title="4/10/15">4/10/15</span>
<button class="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small" tabindex="-1" title="Edit Close Date of Acme - 1,200 Widgets">

<span class="slds-assistive-text">Edit Close Date of Acme - 1,200 Widgets</span>
</button>
</span>
</td>
<td class="slds-cell-edit" role="gridcell">
<span class="slds-grid slds-grid_align-spread">
<span class="slds-truncate" title="Long text field with many lines and truncation will look like this. Even though the text might go on for ages and ages.Long text field with many lines and truncation will look like this. Even though the text might go on for ages and ages.">Long text field with many lines and truncation will look like this. Even though the text might go on for ages and ages.Long text field with many lines and truncation will look like this. Even though the text might go on for ages and ages.</span>
<button class="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small" tabindex="-1" title="Edit Stage of Acme - 1,200 Widgets">

<span class="slds-assistive-text">Edit Stage of Acme - 1,200 Widgets</span>
</button>
</span>
</td>




</tr>


</tbody>
</table>
</aura:application>
