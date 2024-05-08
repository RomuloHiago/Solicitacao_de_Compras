<#import "/wcm.ftl" as wcm/>

<#-- Variaveis globais para os layouts -->
<#import "/layout-globals.ftl" as globals />

<#if pageRender.isPreviewMode() = true>
	<@wcm.previewPageAlert />
	<@wcm.deviceTogglePreview />
</#if>

<div class="wcm-wrapper-content ${wcmLayoutEditClass!""} ${pageAuthTypeClass!""}">

    <#if pageRender.isEditMode() = false>
        <@wcm.header />
        <@wcm.menu />
    </#if>

    <div class="wcm-all-content">

        <div id="wcm-content" class="clearfix wcm-background">

            <#if pageRender.isEditMode() = true>
                <@wcm.editHeader />
                <@wcm.widgetsList />
            </#if>

            <div id="${divMasterId}">

                <!-- Slot 1 do meu Layout -->
                <div class="editable-slot slotfull layout-1-1" id="slotFull1">
                    <@wcm.renderSlot id="SlotA" editableSlot="true" isResponsiveSlot="true" />
                </div>

                <!-- Slot 2 do meu Layout-->
                <div class="editable-slot slotfull layout-1-1" id="slotFull2">
                    <@wcm.renderSlot id="SlotB" editableSlot="true" isResponsiveSlot="true" />
                </div>

                <#if fluigThemeCode != "responsive_theme">
                    <@wcm.footer layoutuserlabel="wcm.layoutsimples.user"/>
                </#if>
            <div>
        </div>
	</div>
</div>