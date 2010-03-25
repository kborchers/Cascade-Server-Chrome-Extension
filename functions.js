// the cms's url
var cmsURL = window.location.protocol + "//" + window.location.host;

// get the folder it's deployed in (e.g. the 'cms' in http://localhost/cms/entity/open.act?)
var deploy = "";

// the asset tree links
var sideBar = $("#tree a");

// different extension icons
var arrowImg = chrome.extension.getURL("styles/arrow.png");
var viewIcon = chrome.extension.getURL("styles/view.png");
var editIcon = chrome.extension.getURL("styles/edit.png");
var copyIcon = chrome.extension.getURL("styles/copy.png");
var deleteIcon = chrome.extension.getURL("styles/delete.png");
var publishIcon = chrome.extension.getURL("styles/publish.png");

for (var i in sideBar)
{
	// 0 will always be the base folder. we'll ignore it for now
	if (i != 0)
		$(sideBar[i]).after('<img src="'+arrowImg+'" class="arrow"/>');
				/*+'<ul class="ext-box">'
					+'<li><a href="#" style="background:url('+ viewIcon +') no-repeat left top;">View</a></li>'
					+'<li><a href="#" style="background:url('+ editIcon +') no-repeat left top;">Edit</a></li>'
					+'<li><a href="#" style="background:url('+ copyIcon +') no-repeat left top;">Copy</a></li>'
					+'<li><a href="#" style="background:url('+ deleteIcon +') no-repeat left top;">Delete</a></li>'
					+'<li><a href="#" style="background:url('+ publishIcon +') no-repeat left top;">Publish</a></li>'
				+'</ul>');*/	
	$(".arrow").click(
			function()
			{
				var menu = generateMenu(this);
				$(this).after(menu);
				$(this).next().show();
			});	
}

/**
 * Generates the HTML for the popup menu
 * @param el The element where the menu will be inserted after
 * @return
 */
function generateMenu(el)
{
	var link = $(el).prev("a").attr("href");	
	var linkInfo = getLinkInfo(link);
	var id = linkInfo["id"];
	var type = linkInfo["type"];
	var menuHTML = '<ul class="ext-box">'
		+'<li><a href="'+ viewAssetLink(id, type) +'" style="background:url('+ viewIcon +') no-repeat left top;">View</a></li>'
		+'<li><a href="'+ editAssetLink(id, type) +'" style="background:url('+ editIcon +') no-repeat left top;">Edit</a></li>'
		+'<li><a href="'+ copyAssetLink(id, type) +'" style="background:url('+ copyIcon +') no-repeat left top;">Copy</a></li>'
		+'<li><a href="'+ deleteAssetLink(id, type) +'" style="background:url('+ deleteIcon +') no-repeat left top;">Delete</a></li>'
		+'<li><a href="'+ publishAssetLink(id, type) +'" style="background:url('+ publishIcon +') no-repeat left top;">Publish</a></li>'
	+'</ul>';
	return menuHTML;
}

/**
 * Searches the link string to determine if is an asset.
 * @param link The link of the asset
 * @return array object that includes the asset's type, id, and a boolean saying it's an asset
 */
function getLinkInfo(link) 
{    
	var to_ret = new Array();
    to_ret["asset"] = false;
    
    var regex1 = new RegExp(/id=(.*?)(&|$|')/);
    var regex2 = new RegExp(/type=(.*?)(&|$|')/);
    if (link.match(regex1) && link.match(regex2)) 
    {
        var match = regex1.exec(link);
        var id = match[1];
        match = regex2.exec(link);
        var type = match[1];

        to_ret["type"] = type;
        to_ret["id"] = id;

        to_ret["asset"] = true;

    }
    return to_ret;
}

/**
 * Generates the link to view an asset
 * @param id
 * @param type
 * @return
 */
function viewAssetLink(id, type)
{	
	return cmsURL+deploy+"/entity/open.act?type="+type+"&id="+id;
}

/**
 * Generates the link to edit an asset
 * @param id
 * @param type
 * @return
 */
function editAssetLink(id, type)
{	
	return cmsURL+deploy+"/entity/edit.act?type="+type+"&id="+id;
}

/**
 * Generates the link to copy an asset
 * @param id
 * @param type
 * @return
 */
function copyAssetLink(id, type)
{	
	return cmsURL+deploy+"/entity/copy.act?type="+type+"&id="+id;
}

/**
 * Generates the link to delete an asset
 * @param id
 * @param type
 * @return
 */
function deleteAssetLink(id, type)
{	
	return cmsURL+deploy+"/entity/delete.act?type="+type+"&id="+id;
}

/**
 * Generates the link to publish an asset
 * @param id
 * @param type
 * @return
 */
function publishAssetLink(id, type)
{	
	return cmsURL+deploy+"/entity/publish.act?type="+type+"&id="+id;
}