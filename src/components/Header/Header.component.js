"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logo_component_1 = __importDefault(require("@/components/Logo/Logo.component"));
const HeaderActions_components_1 = __importDefault(require("@/components/Header/components/HeaderActions/HeaderActions.components"));
const Layout_component_1 = require("@/components/Layout/Layout.component");
const Header = () => {
    return (<header className="flex">
      <Layout_component_1.Container>
        <div className="h-20 flex items-center justify-between">
          <Logo_component_1.default />
          {/* <Menu /> */}
          <HeaderActions_components_1.default />
        </div>
      </Layout_component_1.Container>
    </header>);
};
exports.default = Header;
