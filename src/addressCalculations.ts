export const convertIpToBin = (ip: string) =>
  ip
    .split('.')
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'));
export const convertIpToDec = (ip: any[]) =>
  ip.map((octet) => String(parseInt(octet, 2)));
export const calculateBroadcast = (ip: any[], mask: any[]): string[] =>
  mask.map((mOctet, i) =>
    mOctet
      .split('')
      .map((bit: string, j: string | number) => (bit === '1' ? ip[i][j] : '1'))
      .join('')
  );
export const calculateNetworkAddress = (ip: any[], mask: any[]): string[] =>
  mask.map((mOctet, i) =>
    mOctet
      .split('')
      .map((bit: string, j: string | number) => (bit === '1' ? ip[i][j] : '0'))
      .join('')
  );

export const netmaskShort = (netmask: string[]) =>
  netmask
    .join('')
    .split('')
    .reduce((sum, bit) => sum + parseInt(bit, 10), 0);

export const calculateHostsCount = (netmask: string[]) =>
  Math.pow(2, 32 - netmaskShort(netmask)) - 2;

export const addOneBin = (octet: string): string => {
  const newOctet = parseInt(octet, 2) + 1;
  return parseInt(String(newOctet), 10).toString(2).padStart(8, '0');
};

export const removeOneBin = (octet: string): string => {
  const newOctet = parseInt(octet, 2) - 1;
  return parseInt(String(newOctet), 10).toString(2).padStart(8, '0');
};

export const calculateGatewayAddress = (broadcast: string[]) =>
  broadcast.map((octet, octetNo) =>
    octetNo === 3 ? removeOneBin(octet) : octet
  );
export const calculateFirstAddressAddress = (network: string[]) =>
  network.map((octet, octetNo) => (octetNo === 3 ? addOneBin(octet) : octet));

export const addSpaceAtposition = (address: string[], position: number): string[] =>
  address.map((octet, octetNo) =>
    octet
      .split('')
      .map((bit, bitNo) =>
        octetNo * 8 + (bitNo + 1) === position ? `${bit} ` : bit
      )
      .join('')
  );

export const netmaskLengthToIp = (length: number): string[] =>
  convertIpToDec(
    ['', '', '', ''].map((_, octetNo) =>
      new Array(8)
        .fill('0')
        .map((_, bitNo) => (octetNo * 8 + (bitNo + 1) > length ? '0' : '1'))
        .join('')
    )
  );
