var nav = new NavigationCollector,
    eventList = ["onBeforeNavigate", "onCreatedNavigationTarget", "onCommitted", "onCompleted", "onDOMContentLoaded", "onErrorOccurred", "onReferenceFragmentUpdated", "onTabReplaced", "onHistoryStateUpdated"];
eventList.forEach(function(e) { chrome.webNavigation[e].addListener(function(n) { console.log(chrome.i18n.getMessage("inHandler"), e, n) }) }), chrome.runtime.onStartup.addListener(function() { nav.resetDataStorage() });
