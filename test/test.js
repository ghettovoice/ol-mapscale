var assert = chai.assert;

var map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: [ 0, 0 ],
        zoom: 2
    }),
    interactions: [], // remove all interactions to disable animations
    layers: [],
});

suite('MapScale control', function () {
    test('Test add control', function (done) {
        var mapScaleControl = new ol.control.MapScale();
        map.addControl(mapScaleControl);

        assert.ok(map.getControls().getArray().indexOf(mapScaleControl) !== -1);

        var elem = document.querySelector('.ol-mapscale');
        // todo figure out how to get rid of callback hell
        setTimeout(function () {
            assert.ok(!!elem);
            assert.equal(elem.querySelector('.ol-scale-value').textContent, '1 : 148M');

            map.getView().setZoom(10);
            setTimeout(function () {
                assert.equal(elem.querySelector('.ol-scale-value').textContent, '1 : 578k');

                map.getView().setZoom(20);
                setTimeout(function () {
                    assert.equal(elem.querySelector('.ol-scale-value').textContent, '1 : 564');
                    done();
                }, 100);
            }, 100);
        }, 100);
    });
});
