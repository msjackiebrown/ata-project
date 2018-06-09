(ns pricebook.env
  (:require [selmer.parser :as parser]
            [clojure.tools.logging :as log]
            [pricebook.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[pricebook started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[pricebook has shut down successfully]=-"))
   :middleware wrap-dev})
