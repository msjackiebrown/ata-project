(ns user
  (:require [pricebook.config :refer [env]]
            [clojure.spec.alpha :as s]
            [expound.alpha :as expound]
            [mount.core :as mount]
            [pricebook.figwheel :refer [start-fw stop-fw cljs]]
            [pricebook.core :refer [start-app]]
            [pricebook.db.core]
            [conman.core :as conman]
            [luminus-migrations.core :as migrations]))

(alter-var-root #'s/*explain-out* (constantly expound/printer))

(defn start []
  (mount/start-without #'pricebook.core/repl-server))

(defn stop []
  (mount/stop-except #'pricebook.core/repl-server))

(defn restart []
  (stop)
  (start))

(defn restart-db []
  (mount/stop #'pricebook.db.core/*db*)
  (mount/start #'pricebook.db.core/*db*)
  (binding [*ns* 'pricebook.db.core]
    (conman/bind-connection pricebook.db.core/*db* "sql/queries.sql")))

(defn reset-db []
  (migrations/migrate ["reset"] (select-keys env [:database-url])))

(defn migrate []
  (migrations/migrate ["migrate"] (select-keys env [:database-url])))

(defn rollback []
  (migrations/migrate ["rollback"] (select-keys env [:database-url])))

(defn create-migration [name]
  (migrations/create name (select-keys env [:database-url])))


