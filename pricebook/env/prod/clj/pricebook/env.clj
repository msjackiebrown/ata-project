(ns pricebook.env
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[pricebook started successfully]=-"))
   :stop
   (fn []
     (log/info "\n-=[pricebook has shut down successfully]=-"))
   :middleware identity})
