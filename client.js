import net from 'net';
import { clearLine } from 'readline';
import { readHeader, writeHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const HOST = 'localhost';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`Connected to the server...`);

  const message = 'Hello';
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 11);
  const packet = Buffer.concat([header, buffer]);
  client.write(packet);

  client.on('data', (data) => {
    const buffer = Buffer.from(data);

    const { handlerId, length } = readHeader(data);
    console.log(`handlerId : ${handlerId}`);
    console.log(`length : ${length}`);

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
    const message = buffer.slice(headerSize);
    console.log(`server에게 받은 메세지: ${message}`);
  });

  client.on('close', (data) => {
    console.log(`Client Disconnected : ${client.remoteAddress}:${client.remotePort}`);
  });

  client.on('error', (err) => {
    console.error('Socket error:', err);
  });
});
