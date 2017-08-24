<div id="$HolderID" class="field<% if $extraClass %> $extraClass<% end_if %>" $AttributesHTML>
	<div class="grid-controls">
		<div class="icon-button-group">
			<a href="#desktop" class="icon-button font-icon-monitor active" title="Desktop mode"></a>
			<a href="#tablet" class="icon-button font-icon-tablet" title="Tablet mode"></a>
		</div>
	</div>
	<% if $Title %><label class="left" for="$ID">$Title</label><% end_if %>
	<div class="middleColumn">
		$Field
	</div>
	<% if $RightTitle %><label class="right" for="$ID">$RightTitle</label><% end_if %>
	<% if $Message %><span class="message $MessageType">$Message</span><% end_if %>
	<% if $Description %><span class="description">$Description</span><% end_if %>
</div>
