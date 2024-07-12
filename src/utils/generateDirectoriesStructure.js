import { promises as fs } from 'fs';
import path from 'path';

const components = [
  'Chat',
  'Header',
  'Footer',
  'MessageList',
  'Message',
  'SideBar',
];

async function createComponentStructure() {
  // Create components directory if it doesn't exist
  const componentsDir = path.join(process.cwd(), 'components');
  await fs.mkdir(componentsDir, { recursive: true });

  for (const component of components) {
    const componentDir = path.join(componentsDir, component);

    // Create component directory
    await fs.mkdir(componentDir, { recursive: true });

    // Create Component.tsx
    await fs.writeFile(
      path.join(componentDir, `${component}.tsx`),
      `import React from 'react';\nimport styles from './${component}.module.scss';\n\nconst ${component}: React.FC = () => {\n  return (\n    <div className={styles.${component.toLowerCase()}}>\n      ${component} Component\n    </div>\n  );\n};\n\nexport default ${component};\n`
    );

    // Create Component.spec.tsx
    await fs.writeFile(
      path.join(componentDir, `${component}.spec.tsx`),
      `import React from 'react';\nimport { render } from '@testing-library/react';\nimport ${component} from './${component}';\n\ndescribe('${component}', () => {\n  it('renders without crashing', () => {\n    render(<${component} />);\n  });\n});\n`
    );

    // Create Component.module.scss
    await fs.writeFile(
      path.join(componentDir, `${component}.module.scss`),
      `.${component.toLowerCase()} {\n  /* Add your styles here */\n}\n`
    );

    // Create Component.types.ts
    await fs.writeFile(
      path.join(componentDir, `${component}.types.ts`),
      `// Define types for ${component} component\n`
    );

    // Create ComponentName.model.ts - mobx store for data fetching and saving
    await fs.writeFile(
      path.join(componentDir, `${component}.model.ts`),
      `import { makeAutoObservable } from "mobx";\n\nclass ${component}Model {\n  constructor() {\n    makeAutoObservable(this);\n  }\n\n  // Define your state and actions here\n}\n\nexport default new ${component}Model();\n`
    );

    // Create ComponentName.ctrl.ts - controller for view, so we can put all logic here
    await fs.writeFile(
      path.join(componentDir, `${component}.ctrl.ts`),
      `// Controller for ${component} component\n\nclass ${component}Controller {\n  // Add your logic here\n}\n\nexport default new ${component}Controller();\n`
    );
  }

  console.log('Component directories and files created successfully.');
}

createComponentStructure().catch(console.error);
