import i18n from "i18n-js"
import Config from "react-native-config";

import locale from "@translations";

i18n.defaultLocale = Config.DEFAULT_LOCALE;
i18n.locale = Config.DEFAULT_LOCALE;
i18n.fallbacks = true;
i18n.translations = locale

export default i18n;
