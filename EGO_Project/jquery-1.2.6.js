$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: "jquery_xml.xml",
    dataType: "xml",
    success: parseXml
  });
});