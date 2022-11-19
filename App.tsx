import React, { useState } from 'react';
import IpCalculator from './IpCalculator';

const convertIpToDec = (ip: any[]) =>
  ip.map((octet) => String(parseInt(octet, 2)));
const netmaskLengthToIp = (length: number): string[] =>
  convertIpToDec(
    ['', '', '', ''].map((_, octetNo) =>
      new Array(8)
        .fill('0')
        .map((_, bitNo) => (octetNo * 8 + (bitNo + 1) > length ? '0' : '1'))
        .join('')
    )
  );

function App() {
  const [ip, setIp] = useState<string>('192.168.1.145');
  const [netmask, setNetmask] = useState('255.255.255.128');

  const onIpChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIp(event.target.value);
  };
  const onNetmaskChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    console.log(event.target.value);
    setNetmask(event.target.value);
  };

  return (
    <main>
      <form>
        <label htmlFor="ip">Ip</label>
        <input
          value={ip}
          onChange={onIpChange}
          type="text"
          id="ip"
          name="input1"
          size={20}
          placeholder="192.168.1.145"
        />
        <label htmlFor="netmask">Netmask</label>
        <select name="netmask" onChange={onNetmaskChange}>
          {new Array(28)
            .fill(null)
            .map((_, length) => netmaskLengthToIp(length + 4))
            .map((ip, id) => (
              <option value={ip.join('.')} key={ip.join('')}>
                {ip.join('.')}/{id + 4}
              </option>
            ))}
        </select>
      </form>
      <IpCalculator ip={ip} netmask={netmask} />
    </main>
  );
}

export default App;
