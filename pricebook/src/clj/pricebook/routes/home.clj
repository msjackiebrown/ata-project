(ns pricebook.routes.home
  (:require [pricebook.layout :as layout]
            [pricebook.db.core :as db]
            [compojure.core :refer [defroutes GET POST PUT DELETE]]
            [ring.util.http-response :as response]
            [clojure.java.io :as io]
            [struct.core :as st]))


(def message-schema
  [ 
   [:id
    st/required
    st/string
    ]
   [:entry_date
    st/required
    st/string
   ]

   [:item
    st/required
    st/string]
    
   [:price
    st/required
    st/string   ]
   ])

(defn validate-price [params]
  (first (st/validate params message-schema)))

(defn save-price! [{:keys [params]}]
  (if-let [errors (validate-price params)]
    (-> (response/found "/")
        (assoc :flash (assoc params :errors errors)))
    (do
      (db/save-price!
       (assoc params :entry_date (java.util.Date.)))
      (response/found "/"))))

(defn update-price! [{:keys [params]}]
  (if-let [errors (validate-price params)]
    (-> (response/found "/")
        (assoc :flash (assoc params :errors errors)))
    (do
      (db/update-price!
       (assoc params :timestamp (java.util.Date.)))
      (response/found "/"))))

(defn delete-price! [{:keys [params]}]
  (if-let [errors (validate-price params)]
    (-> (response/found "/")
        (assoc :flash (assoc params :errors errors)))
    (do
      (db/delete-price!
       (assoc params :timestamp (java.util.Date.)))
      (response/found "/"))))

(defn home-page [{:keys [flash]}]
  (layout/render
   "home.html"
   (merge {:prices (db/get-prices)}
          (select-keys flash [:name :message :errors]))))

(defroutes home-routes
  (GET "/" request (home-page request))
  (POST "/" request (save-price! request))
  (PUT "/" request (update-price! request))
  (DELETE "/" request(delete-price! request))
 )