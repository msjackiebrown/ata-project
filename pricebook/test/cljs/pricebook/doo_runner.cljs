(ns pricebook.doo-runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [pricebook.core-test]))

(doo-tests 'pricebook.core-test)

