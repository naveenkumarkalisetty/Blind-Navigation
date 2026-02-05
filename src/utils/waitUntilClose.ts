import Geolocation from "@react-native-community/geolocation";

function distanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function waitUntilClose(
  targetLat: number,
  targetLon: number,
  threshold = 40
): Promise<void> {
  return new Promise(resolve => {
    const watchId = Geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;

        const d = distanceMeters(
          latitude,
          longitude,
          targetLat,
          targetLon
        );

        if (d <= threshold) {
          console.log(`[Navigation] Reached target! (Distance: ${d.toFixed(1)}m)`);
          Geolocation.clearWatch(watchId);
          resolve();
        } else {
          console.log(`[Navigation] Distance to next step: ${d.toFixed(1)}m (Target: ${threshold}m)`);
        }
      },
      err => console.warn("GPS error", err),
      { enableHighAccuracy: true, distanceFilter: 1 }
    );
    // DEBUG: Auto-skip after 5 seconds if not moving (remove in production)
    /*
    setTimeout(() => {
       console.log("DEBUG: Auto-skipping step");
       Geolocation.clearWatch(watchId);
       resolve();
    }, 5000);
    */
  });
}
