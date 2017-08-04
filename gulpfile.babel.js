import gulp from 'gulp';
import path     from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import print    from 'gulp-print';
import fs       from 'fs';
import yargs    from 'yargs';
import _        from 'lodash';
import changeCase from 'change-case';

const paths = {
  blankTemplates: path.join(__dirname, 'tools', 'generator', 'component/**/*.**')
};

gulp.task('component', () => {
  let cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  let name = yargs.argv.name;

  if(!name) {
    throw "Component name required. Try --name myComponent";
  }

  let namespace = yargs.argv.namespace;
  let parentPath = namespace || '';
  let groupPath = yargs.argv.group || 'components';

  let nameKebab = changeCase.paramCase(name);
  let namePascal = changeCase.pascalCase(name);
  let nameCamel = changeCase.camelCase(name);

  let destPath = path.join(__dirname, 'src', 'app', groupPath, parentPath, nameKebab);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      namespace: namespace,
      moduleName: _.compact([groupPath, namespace, namePascal]).join('.'),
      namePascal,
      nameKebab,
      nameCamel
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', nameKebab);
    }))
    .pipe(gulp.dest(destPath))
    .pipe(print((f) => `Generated: ${f}`));
});
