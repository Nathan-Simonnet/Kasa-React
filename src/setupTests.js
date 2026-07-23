import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

// jsdom doesn't provide these globals, but react-router-dom v7 requires them.
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;
