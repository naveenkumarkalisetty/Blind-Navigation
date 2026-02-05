import Geolocation from "@react-native-community/geolocation";

export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      error => {
        console.error("GPS Error:", error);
        reject(error);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  });
}
