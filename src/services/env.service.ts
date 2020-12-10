import * as fs from 'fs';
import { template } from 'lodash';

export class EnvService {
  async compile(file, template_file_path, values) {
    try {
      const content = fs.readFileSync(template_file_path, 'utf8');
      const compiled = template(content);
      const new_content = compiled(values);
      fs.writeFileSync(file, new_content);
      return new_content;
    } catch (error) {
      process.exit(1);
    }
  }
}
