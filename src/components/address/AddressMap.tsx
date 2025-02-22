"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/assets/icons/location.svg",
  iconSize: [32, 32],
});

type AddressMapProps = {
  mapCenter: [number, number];
  setMapCenter: (coords: [number, number]) => void;
  setAddressData: (data: { address: string; location: string }) => void;
};

const MapComponent = ({ mapCenter, setMapCenter, setAddressData }: AddressMapProps) => {
  const [position, setPosition] = useState<[number, number]>(mapCenter);

  useEffect(() => {
    setPosition(mapCenter);
  }, [mapCenter]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setMapCenter([lat, lng]);

      // Reverse Geocoding (Get Address from LatLng)
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then((res) => res.json())
        .then((data) => {
          setAddressData({ address: data.display_name, location: `${lat}, ${lng}` });
        })
        .catch(console.error);
    },
  });

  return <Marker position={position} icon={customIcon} draggable />;
};

const AddressMap = ({ mapCenter, setMapCenter, setAddressData }: AddressMapProps) => {
  return (
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="h-80 w-full rounded-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapComponent mapCenter={mapCenter} setMapCenter={setMapCenter} setAddressData={setAddressData} />
    </MapContainer>
  );
};

export default AddressMap;
