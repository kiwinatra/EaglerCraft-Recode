import Foundation

public abstract class RenderingContext {
    private let debugEmitter: DebugInformationEmitter
    private var initialClassSource: ClassReaderSource
    private var classSource: ListableClassReaderSource
    private var resourceProvider: ResourceProvider
    private var classLoader: ClassLoader
    private var services: ServiceRepository
    private var properties: Properties
    private var naming: NamingStrategy
    private var dependencyInfo: DependencyInfo
    private var virtualPredicate: (MethodReference) -> Bool
    private var forcedFunctionPredicate: (MethodReference) -> Bool
    private var stringPoolMap: [String: Int] = [:]
    private var stringPool: [String] = []
    private lazy var readonlyStringPool: [String] = stringPool
    private var injectorMap: [MethodReference: InjectorHolder] = [:]
    private var minifying: Bool
    private var classInitializerInfo: ClassInitializerInfo
    private var strict: Bool

    public init(debugEmitter: DebugInformationEmitter,
                initialClassSource: ClassReaderSource,
                classSource: ListableClassReaderSource,
                resourceProvider: ResourceProvider,
                classLoader: ClassLoader,
                services: ServiceRepository,
                properties: Properties,
                naming: NamingStrategy,
                dependencyInfo: DependencyInfo,
                virtualPredicate: @escaping (MethodReference) -> Bool,
                forcedFunctionPredicate: @escaping (MethodReference) -> Bool,
                classInitializerInfo: ClassInitializerInfo,
                strict: Bool) {
        self.debugEmitter = debugEmitter
        self.initialClassSource = initialClassSource
        self.classSource = classSource
        self.resourceProvider = resourceProvider
        self.classLoader = classLoader
        self.services = services
        self.properties = properties
        self.naming = naming
        self.dependencyInfo = dependencyInfo
        self.virtualPredicate = virtualPredicate
        self.forcedFunctionPredicate = forcedFunctionPredicate
        self.classInitializerInfo = classInitializerInfo
        self.strict = strict
        self.minifying = false
    }

    public func getInitialClassSource() -> ClassReaderSource {
        return initialClassSource
    }

    public func getClassSource() -> ListableClassReaderSource {
        return classSource
    }

    public func getResourceProvider() -> ResourceProvider {
        return resourceProvider
    }

    public func getClassLoader() -> ClassLoader {
        return classLoader
    }

    public func getServices() -> ServiceRepository {
        return services
    }

    public func getProperties() -> Properties {
        return properties
    }

    public func getNaming() -> NamingStrategy {
        return naming
    }

    public func getDependencyInfo() -> DependencyInfo {
        return dependencyInfo
    }
}