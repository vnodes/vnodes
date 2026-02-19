import pkg from '@prisma/generator-helper';
import onGenerate from './on-generate.js';
import onManifest from './on-manifest.js';

const { generatorHandler } = pkg;

export default generatorHandler({
    onManifest: onManifest,
    onGenerate: onGenerate,
});
