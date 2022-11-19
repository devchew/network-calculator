import React, { FunctionComponent } from 'react';
import './IpCalculator.css';

interface Props {
  ip: string;
  netmask: string;
}

const convertIpToBin = (ip: string) =>
  ip
    .split('.')
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'));
const convertIpToDec = (ip: string[]) => ip.map((octet) => parseInt(octet, 2));
const calculateBroadcast = (ip: any[], mask: any[]): string[] =>
  mask.map((mOctet, i) =>
    mOctet
      .split('')
      .map((bit: string, j: string | number) => (bit === '1' ? ip[i][j] : '1'))
      .join('')
  );
const calculateNetworkAddress = (ip: any[], mask: any[]): string[] =>
  mask.map((mOctet, i) =>
    mOctet
      .split('')
      .map((bit: string, j: string | number) => (bit === '1' ? ip[i][j] : '0'))
      .join('')
  );

const netmaskShort = (netmask: string[]) => netmask
  .join('')
  .split('')
  .reduce((sum, bit) => sum + parseInt(bit, 10), 0);

const calculateHostsCount = (netmask: string[]) => {
  return Math.pow(2, 32 - netmaskShort(netmask)) - 2;
};

const addOneBin = (octet: string): string => {
  const newOctet = parseInt(octet, 2) + 1;
  return parseInt(String(newOctet), 10).toString(2).padStart(8, '0');
};

const removeOneBin = (octet: string): string => {
  const newOctet = parseInt(octet, 2) - 1;
  return parseInt(String(newOctet), 10).toString(2).padStart(8, '0');
};

const calculateGatewayAddress = (broadcast: string[]) =>
  broadcast.map((octet, octetNo) =>
    octetNo === 3 ? removeOneBin(octet) : octet
  );
const calculateFirstAddressAddress = (network: string[]) =>
  network.map((octet, octetNo) => (octetNo === 3 ? addOneBin(octet) : octet));

const addSpaceAtposition = (address: string[], position): string[] => address
.map((octet, octetNo) => octet
  .split('')
  .map((bit, bitNo) => ((octetNo * 8 + (bitNo + 1) === position) ? `${bit} ` : bit))
  .join('')
)

const IpCalculatorRow: FunctionComponent<{ ip: string[]; name: string, position?: number }> = ({
  name,
  ip,
  position
}) => {
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
        <IpCalculatorRow position={netmaskLength} ip={ipBin} name="ip address" />
        <IpCalculatorRow position={netmaskLength} ip={netmaskBin} name="mask" />
        <IpCalculatorRow position={netmaskLength} ip={netAddressBin} name="network address" />
        <IpCalculatorRow position={netmaskLength} ip={broadcastAddress} name="broadcast address" />
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
