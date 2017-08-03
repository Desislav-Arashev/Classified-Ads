function gSubmitForm(x) {
    document.getElementById("location").value = selected_location;

    document.getElementById("link_category").value = category_selected_location;

    if (images.files.length > allowed_images) {
        alert("You selected more than  " + allowed_images + " images (which is the maximum allowed for this pricing plan)");
        return false;
    }

    return true;
}

var category_suggest_location_url = "./static/include/suggest_category.php?lang=en";

var main_cat_ids = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

var suggest_location_url = "./static/include/suggest_location.php";

var geocoder;
var map;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
        zoom: 1,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

function PreviewMap() {

    document.getElementById("map-canvas").style.display = "block";

    var address = "";


    if (document.getElementById("selected_dropdown").innerText) {
        address +=
            document.getElementById("selected_dropdown").innerText.replace(" :", ", ") +
            ", ";
    }


    address += document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);

            map.setZoom(13);

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            document.getElementById("latitude").value =
                results[0].geometry.location.lat();

            document.getElementById("longitude").value =
                results[0].geometry.location.lng();


        } else {
            alert('Google Maps can\'t find this address: ' + status);
        }
    });
    google.maps.event.trigger(map, 'resize');
}

window.onload = initialize;

function AddMap() {
    if (document.getElementById("add-map").style.display == "none") {
        document.getElementById("add-map").style.display = "block"
    } else {
        document.getElementById("add-map").style.display = "none"
    }
}

function UserKeyUp() {
    if (document.getElementById("address").value == "") {
        document.getElementById("preview-map").style.display = "none";
    } else {
        document.getElementById("preview-map").style.display = "block";
    }
}

var allowed_images = 5;
if (allowed_images == 0) document.getElementById("images_fieldset").style.display = "none";

function ImagesSelected() {
    if (document.getElementById("images").files.length > 2) {
        alert("You selected more than  " + allowed_images + " images (which is the maximum allowed for this pricing plan)");
        return false;
    }
}

