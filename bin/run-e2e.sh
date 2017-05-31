#!/usr/bin/env bash

set -e

RUNNING=`ps ax | grep 'mock-api.js' | grep -v 'grep' | awk '{ print $1 }'`
if [ ! -z ${RUNNING} ]; then
		echo "Killing running process ${RUNNING}"
    kill ${RUNNING}
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

/usr/bin/env node ${SCRIPT_DIR}/../mock-api.js & ${SCRIPT_DIR}/../node_modules/.bin/ng e2e
