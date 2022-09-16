import { EnvService } from './services/env.service';
import * as path from 'path';
import { get, isNil } from 'lodash';

class App {
  run() {
    const envService = new EnvService();
    const file = path.resolve(process.cwd(), process.env.PLUGIN_FILE);
    const templatePath = path.resolve(process.cwd(), process.env.PLUGIN_TEMPLATE);
    if (!fs.existsSync(templatePath)) {
      console.log(`template file does not exist`);
      process.exit(1);
    }
    const values = {};
    const envs = process.env.PLUGIN_ENVS.split(',');
    envs.forEach((item) => {
      values[item] = get(process.env, `PLUGIN_${item}`);
    });
    for (let k in values) {
      if (isNil(values[k]) || values[k] === '') {
        console.log(`can not get value of ${k}`);
        process.exit(1);
      }
    }
    envService.compile(file, templatePath, values);
  }
}

const app = new App();
app.run();
