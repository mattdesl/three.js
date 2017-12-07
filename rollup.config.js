import analyze from 'rollup-analyzer-plugin';

const analyzeOpts = {
	limit: 10, root: process.cwd()
};

function glsl() {

	return {

		transform( code, id ) {

			if ( /\.glsl$/.test( id ) === false ) return;

			var transformedCode = 'export default ' + JSON.stringify(
				code
					.replace( /[ \t]*\/\/.*\n/g, '' ) // remove //
					.replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
					.replace( /\n{2,}/g, '\n' ) // # \n+ to \n
			) + ';';
			return {
				code: transformedCode,
				map: { mappings: '' }
			};

		}

	};

}

export default {
	input: 'src/Three.js',
	entry: 'src/Three.js',
	indent: '\t',
	plugins: [
		glsl(),
		analyze(analyzeOpts)
	],
	// sourceMap: true,
	output: [
		{
			format: 'umd',
			name: 'THREE',
			file: 'build/three.js'
		},
		{
			format: 'es',
			file: 'build/three.module.js'
		}
	]
};
