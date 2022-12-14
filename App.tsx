import React, { useState } from 'react';
import { netmaskLengthToIp } from './addressCalculations';
import IpCalculator from './IpCalculator';

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
      <img src="http://2.bp.blogspot.com/_KjNkTh3VA1Y/S8rCAPONZ4I/AAAAAAAAAPo/C76ssp9fsU0/s1600/subnetting_c.png" />
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
