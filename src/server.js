const express = require('express');
const openvpnManager = require('openvpn-management');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/connect', async (req, res) => {
  try {
    // Connect to the OpenVPN server on EC2 instance
    const vpnClient = openvpnManager.connect({
      host: 'your-ec2-instance-public-ip',
      port: 'your-openvpn-server-port',
      username: 'your-vpn-username',
      password: 'your-vpn-password'
    });

    vpnClient.on('connected', () => {
      console.log('Connected to VPN');
      
      // Add any additional logic here if needed
      
      res.status(200).send({ message: 'Connected to Netflix Korea VPN' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to connect to Netflix Korea VPN' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

