import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';

/**
 * Get Local IP Address (Primary Source)
 */
export const getLocalIPAddress = async (): Promise<string> => {
  try {
    const ip = await NetworkInfo.getIPV4Address();
    console.log('IP ADDRESS:', ip);
    return ip || '0.0.0.0';
  } catch (error) {
    console.error('Error getting local IP address:', error);
    return '0.0.0.0';
  }
};

/**
 * Convert IP to Broadcast (Safe Version)
 * Assumes subnet 255.255.255.0 (common case)
 */
const setLastBlockTo255 = (ip: string): string => {
  try {
    const parts = ip.split('.').map(Number);

    if (parts.length !== 4 || parts.some(isNaN)) {
      return '255.255.255.255';
    }

    parts[3] = 255;
    return parts.join('.');
  } catch {
    return '255.255.255.255';
  }
};

/**
 * Get Broadcast IP Address (Stable & Cross-platform)
 */
export const getBroadcastIPAddress = async (): Promise<string> => {
  try {
    let ip: string | null = null;

    // 🔹 Primary: NetworkInfo
    try {
      ip = await NetworkInfo.getIPV4Address();
    } catch {
      // ignore
    }

    // 🔹 Fallback: DeviceInfo
    if (!ip) {
      try {
        ip = await DeviceInfo.getIpAddress();
      } catch {
        // ignore
      }
    }

    const finalIP = ip || '0.0.0.0';
    const broadcastAddress = setLastBlockTo255(finalIP);

    console.log('Broadcast Address:', broadcastAddress);

    return broadcastAddress;
  } catch (error) {
    console.error('Error getting broadcast address:', error);
    return '255.255.255.255';
  }
};