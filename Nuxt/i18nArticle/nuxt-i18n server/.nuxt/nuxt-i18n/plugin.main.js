import Cookie from 'cookie'
import JsCookie from 'js-cookie'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { nuxtI18nSeo } from './seo-head'

Vue.use(VueI18n)

export default async (context) => {
  const { app, route, store, req, res } = context;

  // Options
  const lazy = false
  const vuex = {"moduleName":"i18n","mutations":{"setLocale":"I18N_SET_LOCALE","setMessages":"I18N_SET_MESSAGES"},"preserveState":false}

  // Helpers
  const LOCALE_CODE_KEY = 'code'
  const LOCALE_DOMAIN_KEY = 'domain'
  const getLocaleCodes = (locales = []) => {
  if (locales.length) {
    // If first item is a sting, assume locales is a list of codes already
    if (typeof locales[0] === 'string') {
      return locales
    }
    // Attempt to get codes from a list of objects
    if (typeof locales[0][LOCALE_CODE_KEY] === 'string') {
      return locales.map(locale => locale[LOCALE_CODE_KEY])
    }
  }
  return []
}
  const getLocaleFromRoute = (route = {}, routesNameSeparator = '', defaultLocaleRouteNameSuffix = '', locales = []) => {
  const codes = getLocaleCodes(locales)
  const localesPattern = `(${codes.join('|')})`
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`
  // Extract from route name
  if (route.name) {
    const regexp = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, 'i')
    const matches = route.name.match(regexp)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  } else if (route.path) {
    // Extract from path
    const regexp = new RegExp(`^/${localesPattern}/`, 'i')
    const matches = route.path.match(regexp)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  }
  return null
}
  const getHostname = () => (
  process.browser ? window.location.href.split('/')[2] : req.headers.host // eslint-disable-line
)
  const getForwarded = () => (
  process.browser ? window.location.href.split('/')[2] : (req.headers['x-forwarded-host'] ? req.headers['x-forwarded-host'] : req.headers.host)
)
  const getLocaleDomain = () => {
  const hostname = app.i18n.forwardedHost ? getForwarded() : getHostname()
  if (hostname) {
    const localeDomain = app.i18n.locales.find(l => l[LOCALE_DOMAIN_KEY] === hostname) // eslint-disable-line
    if (localeDomain) {
      return localeDomain[LOCALE_CODE_KEY]
    }
  }
  return null
}
  const syncVuex = async (locale = null, messages = null) => {
  if (vuex && store) {
    if (locale !== null && vuex.mutations.setLocale) {
      await store.dispatch(vuex.moduleName + '/setLocale', locale)
    }
    if (messages !== null && vuex.mutations.setMessages) {
      await store.dispatch(vuex.moduleName + '/setMessages', messages)
    }
  }
}

  // Register Vuex module
  if (store) {
    store.registerModule(vuex.moduleName, {
      namespaced: true,
      state: () => ({
        locale: '',
        messages: {}
      }),
      actions: {
        setLocale ({ commit }, locale) {
          commit(vuex.mutations.setLocale, locale)
        },
        setMessages ({ commit }, messages) {
          commit(vuex.mutations.setMessages, messages)
        }
      },
      mutations: {
        [vuex.mutations.setLocale] (state, locale) {
          state.locale = locale
        },
        [vuex.mutations.setMessages] (state, messages) {
          state.messages = messages
        }
      }
    }, { preserveState: vuex.preserveState })
  }

  const detectBrowserLanguage = {"useCookie":true,"cookieKey":"i18n_redirected","alwaysRedirect":"","fallbackLocale":null}
  const { useCookie, cookieKey } = detectBrowserLanguage

  const setLocaleCookie = locale => {
    if (!useCookie) {
      return;
    }
    const date = new Date()
    if (process.client) {
      JsCookie.set(cookieKey, locale, {
        expires: new Date(date.setDate(date.getDate() + 365)),
        path: '/'
      })
    } else if (res) {
      let headers = res.getHeader('Set-Cookie') || []
      if (typeof headers == 'string') {
        headers = [headers]
      }

      const redirectCookie = Cookie.serialize(cookieKey, locale, {
        expires: new Date(date.setDate(date.getDate() + 365)),
        path: '/'
      })
      headers.push(redirectCookie)

      res.setHeader('Set-Cookie', headers)
    }
  }

  // Set instance options
  app.i18n = new VueI18n({"messages":{"de":{"siteName":"keineechtewebseite.de","article1":{"title":"Weit eingabe betrachtete diesen weiteren Molch in sich","paragraph1":"Der Specht tanzte den unparteiischen, viel zu scherzhaften Mann, und über Wow und Rattenfalke ließen die Yikes erfolglos eine Pille hoch und stupsten einen Orca an, der von einem weniger fließenden, turbulenten Mann gemurmelt wurde -war einige hinter einem inneren Widerstreben dies und inmitten eines weniger gottlos gestreckten Schnabels schrieben, aber weit schwach mit Gent einige Skorpion andere bellten gut tapfer weit scherzhaft neu gelegtes festes, geschrubbtes Rohmaterial weniger dieses viel schauderndes Grizzly dieses Unbekümmerte, das viel Fabelhaftes studierte schmollend irrtümlich unbewusst und fadenscheinig.","paragraph2":"Ein wie gestoppt wolliges, fast abscheuliches Gegengütesiegel, empört, verständlich, einige weggeworfen, während dieser unehrliche Fischnachtigall-Austernaal einiges hey strickte, das viel in vorhergesagtem getanztem ocelot ausgenommen lobenswertem Windhund zuckte, strebte, meine Güte, viel ein schreckliches, elegant gurgelte, wie das und heulte im Vergleich zu vielem, wo in Jeepers zurückgesetzt, während Biene ein finsteres Gesicht dies die da im Haus nach sexy weniger, dass gut ein für wo viel Gosh unverkennbar und weniger unerschöpflich viel Gosh Flamingo als perfekt einige geschickt, wenn Känguru warf etwas lebhaft angesehen, bis sehr viel böse böse stachelte.","paragraph3":"Ein weit mit Stolz frisch geklebter Davor, wo Filzmischungen viel gefangen haben, während ausgeliehener Straußfalke entschlossen weit unberechenbar vor schändlichem unbestreitbarem Summen brummte, amüsierte sich unpassendes Gegenteil beneidenswert zwischen wildem Davor und liebem schmackhaftem Dahinritt bei weitem widerwillig modisch daher, dass oder wohl unbegrenzt, wo immer liebevoll eingelassene Lemminge lieber Mandrill aßen, mit Ausnahme von Kobra Kardinal einige entschlossen und finster husky sicher dies deshalb dies frühzeitig.","paragraph4":"So wie mein Lieber bemerkenswert viel Orca gestanden und doch wunderbar rücksichtslos geschleppt, wo weniger Jeeper in einem ebenso viel auffälligen Wombat hingen, weinte die Möwe daher oh, wenn dies verworfen wurde, wenn schlüssig mehr Güte gehend, tadelnd weniger ein lieber, autsch verärgert und Flamingo gebeugt wurde Einige erschreckend, dass ungebundene schnurrte, während einseitig weit verräterisch gegen und witzig Rentier gackerte, hey, nachdem diese weniger Eidechse teuflisch brach und so weit eine fesselnde Güte toucan."}},"en-US":{"siteName":"notarealwebsite.com","article1":{"title":"Far input gazed that more newt one within","paragraph1":"Woodpecker danced the the the in teasing much far glaringly jeez tame for that impartial some well thought and cat jokingly the this and via wow and rat falcon the yikes unsuccessfully coasted some pill up nudged a orca this some goodness hey muttered less fluent turbulent man-of-war some behind a inside reluctant this the and amid ouch oriole less impiously stretched wrote but reran weak far with gent some scorpion other barked well bravely far jocosely re-laid stolid blubbered crud less this more much shuddered grizzly this cantankerous that studied livid much fabulous sulkily erroneously subconscious flimsy and.","paragraph2":"Ably a as stopped woolly near execrable contrary goodness cuffed seal indignant understandable along well some discarded while this dishonestly fish nightingale oyster eel some hey knitted wow teasingly much in forecast danced ocelot excluding commendably greyhound twitched strived jeez much one awful elegantly gurgled jeez the and blubbered howled versus much wherever in jeepers reset while bee a scowled this the since in house according sexy less that well stung a for where much gosh squarely and less inexhaustibly much gosh flamingo as perfectly some remotely adroitly when threw kangaroo marginally gazed vivacious until hugely much forbidding much shoddy.","paragraph3":"A far with proudly freshly stuck before where felt shuffled caught much while lent excluding decisively far erratically at oh ouch that tuneful ostrich falcon before disgraceful indisputable hummed crud amused incongruous contrary enviably between rampant beneath ouch one wow due rode far one heron panther dear tasteful oh wow at far grudging fashionable hence that or arguably boundless wherever affectionate inset lemming dear yikes more mandrill ate lent flauntingly excepting cobra cardinal some decisively and scowled husky safely this therefore this precociously.","paragraph4":"Thus as dear notable much orca confessedly yet wonderful recklessly slung where less a less jeepers within equally a much flashily wombat hung the gull hence gosh wept oh when discarded this when conclusively yikes more goodness walking rebukingly less a dear one ouch peevish while along and flamingo flexed some circa frightening that unbound purred while lopsidedly cackled far treacherously against and wittily reindeer hey so after that less lizard fiendishly broke and toucan this far one engagingly goodness."}},"fr":{"siteName":"pasunvraisiteweb.fr","article1":{"title":"Les entrées lointaines ont regardé que plus de newt un dans","paragraph1":"Specht a dansé le dans les taquineries beaucoup et terriblement jeez apprivoisé pour cette impartiale quelque chose de bien pensé et chat plaisanter le et ceci via wow et rat faucon les yikes ont échoué sans succès une pilule vers le haut un orca ce quelque chose de bon il a marmonné un homme turbulent moins fluide -war certains derrière un intérieur réticent cela et au milieu d'un oriole moins impies étiré écrit mais reran faible avec gentil quelque chose un scorpion autre aboyé bien bravement loin jocos jovialement refait bludber bludber crud moins ceci frissonnait plus grizzly ce cantankerous qui a étudié très vif bêtement par erreur inconscient fragile et.","paragraph2":"Bien caché comme un poignard caché indigne compréhensible le long de certains mendiants tandis que cette poisson malhonnête rossignol huître anguille certains hé tricoté wow teasingly beaucoup dans la prévision a dansé à exclure louable se leva ébranlé a ébranlé Je me suis planté beaucoup contre beaucoup partout où dans les jeepers se remettent à zéro alors que les abeilles sont renfrognées, car dans la maison, moins sexy que piquées, parce que beaucoup de choses sont aussi claires et moins inépuisables que des flamants aussi parfaits que des kangourous jettent un regard vif jusqu'à ce qu'ils interdisent énormément de tristesse.","paragraph3":"Un loin avec fièrement fraîchement coincé avant où se sentait mélangé beaucoup pris mais exclu de manière décisive loin de façon erratique à oh ouch ce faucon harmonieux mélodieux devant honteux honteux indiscutable incontestable amusé opposé de manière envoûtante entre rampant sous le wow un wow dû à cheval un dieu panthère oh wow à contrecœur à la mode donc que ou sans doute sans limite partout où affectent lemming affectueux cher plus mangent, mangés de façon flagrante sauf cobra cardinal certains et découragé husky en toute sécurité cela donc précocement.","paragraph4":"Ainsi, comme vous le savez, beaucoup d'orques avouaient pourtant merveilleusement témérairement en bandoulière, là où moins de jeepers et tout aussi lentement un wombat pendaient la mouette et qui pleurait, oh quand on le jeta quand on le jeta définitivement quand plus de bonté marchait de moins en moins un cher toutou tout en flammes Certaines personnes effrayantes ont fait ronronner ce qui se liait alors que cinglaient de manière inégale et perfidement contre le renne et avec esprit, alors après que moins de lézards se soient brisés de façon diabolique et toucan celle-ci engageant sa bonté."}},"loremIpsum":{"siteName":"quisinantesed.ipsum","article1":{"title":"Massa tincidunt dui ut ornare lectus sit amet","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac auctor augue mauris augue neque gravida in. Lectus quam id leo in vitae turpis. Diam volutpat commodo sed egestas egestas. Vestibulum lectus mauris ultrices eros in cursus. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Morbi tristique senectus et netus et malesuada fames ac turpis. Amet tellus cras adipiscing enim eu turpis egestas pretium. Sed lectus vestibulum mattis ullamcorper velit sed. Et ultrices neque ornare aenean euismod. Lacinia at quis risus sed vulputate odio ut.","paragraph2":"Phasellus vestibulum lorem sed risus ultricies tristique. Massa tincidunt nunc pulvinar sapien et ligula. Etiam dignissim diam quis enim lobortis scelerisque. Sagittis aliquam malesuada bibendum arcu vitae. Sit amet consectetur adipiscing elit duis. Velit sed ullamcorper morbi tincidunt ornare massa eget. Odio morbi quis commodo odio. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Semper auctor neque vitae tempus quam pellentesque nec nam. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Blandit volutpat maecenas volutpat blandit aliquam. In hendrerit gravida rutrum quisque non tellus orci ac. Duis tristique sollicitudin nibh sit amet commodo. Id donec ultrices tincidunt arcu non. Iaculis eu non diam phasellus vestibulum lorem sed. Quis blandit turpis cursus in hac habitasse platea.","paragraph3":"Tincidunt ornare massa eget egestas. Arcu risus quis varius quam quisque id. Mauris augue neque gravida in fermentum et sollicitudin ac orci. Feugiat nisl pretium fusce id velit ut tortor pretium. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Turpis egestas sed tempus urna. Nulla facilisi cras fermentum odio eu feugiat. Et malesuada fames ac turpis. Eget aliquet nibh praesent tristique magna. Congue mauris rhoncus aenean vel elit scelerisque. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Elementum integer enim neque volutpat ac tincidunt vitae semper. Lectus proin nibh nisl condimentum id venenatis a. Pellentesque diam volutpat commodo sed. Amet tellus cras adipiscing enim eu turpis egestas pretium. Sapien faucibus et molestie ac feugiat sed. Eros donec ac odio tempor orci. Etiam tempor orci eu lobortis elementum nibh tellus. Tincidunt praesent semper feugiat nibh sed pulvinar proin.","paragraph4":"Id aliquet risus feugiat in ante. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Euismod in pellentesque massa placerat duis ultricies lacus. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Sapien pellentesque habitant morbi tristique senectus et netus et. Cursus euismod quis viverra nibh cras pulvinar. Feugiat vivamus at augue eget arcu dictum varius. Faucibus vitae aliquet nec ullamcorper sit amet risus. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Orci ac auctor augue mauris augue neque gravida in fermentum. Pharetra sit amet aliquam id diam maecenas ultricies. Mollis aliquam ut porttitor leo. Purus non enim praesent elementum facilisis leo vel fringilla. Odio morbi quis commodo odio aenean. Penatibus et magnis dis parturient montes nascetur ridiculus. Ac turpis egestas maecenas pharetra convallis. Nulla porttitor massa id neque aliquam."}}}})
  app.i18n.locales = ["de","en-US","fr","loremIpsum"]
  app.i18n.defaultLocale = 'en-US'
  app.i18n.differentDomains = false
  app.i18n.forwardedHost = false
  app.i18n.beforeLanguageSwitch = () => null
  app.i18n.onLanguageSwitched = () => null
  app.i18n.setLocaleCookie = setLocaleCookie
  // Extension of Vue
  if (!app.$t) {
    app.$t = app.i18n.t
  }

  // Inject seo function
  Vue.prototype.$nuxtI18nSeo = nuxtI18nSeo

  if (store && store.state.localeDomains) {
    app.i18n.locales.forEach(locale => {
      locale.domain = store.state.localeDomains[locale.code]
    })
  }

  let locale = app.i18n.defaultLocale || null

  if (app.i18n.differentDomains) {
    const domainLocale = getLocaleDomain()
    locale = domainLocale ? domainLocale : locale
  } else {
    const routesNameSeparator = '___'
    const defaultLocaleRouteNameSuffix = 'default'

    const routeLocale = getLocaleFromRoute(route, routesNameSeparator, defaultLocaleRouteNameSuffix, app.i18n.locales)
    locale = routeLocale ? routeLocale : locale
  }

  app.i18n.locale = locale

  // Lazy-load translations
  if (lazy) {
    const { loadLanguageAsync } = require('./utils')

    // Load fallback locale.
    if (app.i18n.fallbackLocale && app.i18n.locale !== app.i18n.fallbackLocale) {
      await loadLanguageAsync(context, app.i18n.fallbackLocale)
    }

    const messages = await loadLanguageAsync(context, app.i18n.locale)
    await syncVuex(locale, messages)
    return messages
  } else {
    // Sync Vuex
    await syncVuex(locale, app.i18n.getLocaleMessage(locale))
  }
}
