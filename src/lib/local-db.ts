'use client'

import localforage from 'localforage'

declare global {
    export interface Window {
        db: {
            journals: LocalForage
            completedJournals: LocalForage
        }
    }
}

export function jewelLocalDb() {
    if (!window.db?.journals) {
        localforage.config({
            driver: localforage.INDEXEDDB,
            name: 'Jewel',
            version: 1.0,
            storeName: 'jewel',
            description: 'the local database for jewel'
        })
        window.db = { ...(window.db ?? {}), journals: localforage }
    }
    return window.db.journals
}

export function completedEntriesDb() {
    if (!window.db?.completedJournals) {
        localforage.createInstance({
            storeName: 'completed_entries'
        })
        window.db = { ...(window.db ?? {}), completedJournals: localforage }
    }
    return window.db.completedJournals
}