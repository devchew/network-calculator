import React, { FunctionComponent } from 'react';
import {
  addSpaceAtposition,
  calculateBroadcast,
  calculateFirstAddressAddress,
  calculateGatewayAddress,
  calculateHostsCount,
  calculateNetworkAddress,
  convertIpToBin,
  convertIpToDec,
  netmaskShort,
} from './addressCalculations';

interface Props {
  ip: string;
  netmask: string;
}

const IpCalculatorRow: FunctionComponent<{
  ip: string[];
  name: string;
  position?: number;
}> = ({ name, ip, position }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{(position ? addSpaceAtposition(ip, position) : ip).join('.')}</td>
      <td>
        {convertIpToDec(ip)
          .map((octet) => String(octet).padStart(3, '_'))
          .join('.')}
      </td>
    </tr>
  );
};

const IpCalculator: FunctionComponent<Props> = ({ ip, netmask }) => {
  const ipBin = convertIpToBin(ip);
  const netmaskBin = convertIpToBin(netmask);
  const netmaskLength = netmaskShort(netmaskBin);
  const netAddressBin = calculateNetworkAddress(ipBin, netmaskBin);
  const broadcastAddress = calculateBroadcast(ipBin, netmaskBin);

  return (
    <table>
      <tbody>
        <IpCalculatorRow
          position={netmaskLength}
          ip={ipBin}
          name="ip address"
        />
        <IpCalculatorRow position={netmaskLength} ip={netmaskBin} name="mask" />
        <IpCalculatorRow
          position={netmaskLength}
          ip={netAddressBin}
          name="network address"
        />
        <IpCalculatorRow
          position={netmaskLength}
          ip={broadcastAddress}
          name="broadcast address"
        />
        <tr>
          <td>hosts count</td>
          <td>{calculateHostsCount(netmaskBin)}</td>
          <td />
        </tr>
        <IpCalculatorRow
          ip={calculateFirstAddressAddress(netAddressBin)}
          name="first address"
        />
        <IpCalculatorRow
          ip={calculateGatewayAddress(broadcastAddress)}
          name="gateway address"
        />
      </tbody>
    </table>
  );
};

export default IpCalculator;
