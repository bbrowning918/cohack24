'use client'

import localforage from 'localforage'

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'Jewel',
    version: 1.0,
    storeName: 'jewel',
    description: 'the local database for jewel'
})

export const jewelLocalDb = localforage